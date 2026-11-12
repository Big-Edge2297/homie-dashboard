"""Photo folder helpers. Pure Python so they can be tested without Home Assistant."""
from __future__ import annotations

import os

from .const import IMAGE_EXTENSIONS

# kind -> sub folders below the integration's media directory
KIND_DIRS: dict[str, tuple[str, ...]] = {
    "frame": ("photos",),
    "background": ("photos", "background"),
}


def kind_dir(media_dir: str, kind: str) -> str | None:
    parts = KIND_DIRS.get(kind)
    return os.path.join(media_dir, *parts) if parts else None


def list_images(media_dir: str) -> dict[str, list[str]]:
    """Return {kind: [file names]} for every supported image, sorted case-insensitively."""
    result: dict[str, list[str]] = {}
    for kind in KIND_DIRS:
        directory = kind_dir(media_dir, kind)
        try:
            names = sorted(os.listdir(directory), key=str.lower)
        except (OSError, TypeError):
            names = []
        result[kind] = [n for n in names if resolve_photo(media_dir, kind, n)]
    return result


def resolve_photo(media_dir: str, kind: str, filename: str) -> str | None:
    """Return the absolute path of a photo, or None if the request is not a plain image file
    inside the right folder (guards against path traversal)."""
    directory = kind_dir(media_dir, kind)
    if directory is None or not filename:
        return None
    if filename != os.path.basename(filename) or filename.startswith(".") or "\\" in filename:
        return None
    if not filename.lower().endswith(IMAGE_EXTENSIONS):
        return None
    full = os.path.realpath(os.path.join(directory, filename))
    if os.path.dirname(full) != os.path.realpath(directory) or not os.path.isfile(full):
        return None
    return full
