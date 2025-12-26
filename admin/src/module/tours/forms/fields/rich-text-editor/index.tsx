"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { getExtensions } from "./extensions";
import { cn } from "@/lib/utils";

import Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}


const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label }) => {
    const editor = useEditor({
        extensions: getExtensions(),
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
        },
    });

    const [active, setActive] = useState({
        bold: false,
        underline: false,
        bulletList: false,
        orderedList: false,
        link: false,
    });

    useEffect(() => {
        if (!editor) return;

        const updateActive = () => {
            setActive({
                bold: !!editor.isActive("bold"),
                underline: !!editor.isActive("underline"),
                bulletList: !!editor.isActive("bulletList"),
                orderedList: !!editor.isActive("orderedList"),
                link: !!editor.isActive("link"),
            });
        };

        updateActive();

        editor.on("selectionUpdate", updateActive);
        editor.on("transaction", updateActive);
        editor.on("update", updateActive);

        return () => {
            editor.off("selectionUpdate", updateActive);
            editor.off("transaction", updateActive);
            editor.off("update", updateActive);
        };
    }, [editor]);

    const setLink = () => {
        if (!editor) return;

        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL (e.g., https://example.com)", previousUrl);
        // for now just have add prompt, later can have a better UI like modal (if needed)

        if (url === null) return;

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    const setColor = () => {
        if (!editor) return;

        const color = window.prompt("Enter color (e.g., #ff0000 or red)");
        // for now just have add prompt, later can have a better UI like modal (if needed)

        if (color) {
            editor.chain().focus().setColor(color).run();
        }
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && editor) {
            editor.chain().focus('end').run();
        }
    };

    if (!editor) return null;


    return (
        <div className='flex flex-col gap-1.5'>
            {label && <FieldLabel>{label}</FieldLabel>}
            <div className="w-full border border-border rounded-md bg-card">
                <div className="flex gap-2 bg-secondary/50 rounded-t-md p-3 border-b border-border">
                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={cn(active.bold && "bg-primary/30 text-secondary-foreground")}
                    >
                        <Icon name="Bold" width={16} height={16} />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={cn(active.underline && "bg-primary/30 text-secondary-foreground")}
                    >
                        <Icon name="Underline" width={16} height={16} />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={cn(active.bulletList && "bg-primary/30 text-secondary-foreground")}
                    >
                        <Icon name="List" width={16} height={16} />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={cn(active.orderedList && "bg-primary/30 text-secondary-foreground")}
                    >
                        <Icon name="ListOrdered" width={16} height={16} />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={setLink}
                        className={cn(active.link && "bg-primary/30 text-secondary-foreground")}
                    >
                        <Icon name="Link" width={16} height={16} />
                    </Button>

                     <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={setColor}
                    >
                        <Icon name="Palette" width={16} height={16} />
                    </Button>
                </div>

                <EditorContent
                    editor={editor}
                    className="tiptap-editor max-w-none overflow-y-auto min-h-40 max-h-100 p-3"
                    onClick={handleContainerClick}
                />
            </div>
        </div>
    );
}


export default RichTextEditor;