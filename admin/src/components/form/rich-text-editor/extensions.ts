import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";


export const getExtensions = () => [
    StarterKit.configure({
        link: false,
        underline: false,
        bulletList: {
            HTMLAttributes: { class: "list-disc ml-5" },
        },
        orderedList: {
            HTMLAttributes: { class: "list-decimal ml-5" },
        },
    }),
    Underline,
    Link.configure({
        openOnClick: false,
        HTMLAttributes: {
            class: "text-blue-600 underline cursor-pointer",
        },
    }),
    TextStyle,
    Color,
]