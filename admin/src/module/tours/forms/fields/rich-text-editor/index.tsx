"use client";

import Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}


const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: { class: "list-disc ml-5" },
                },
                orderedList: {
                    HTMLAttributes: { class: "list-decimal ml-5" },
                },
            }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
        },
    });

    const [active, setActive] = useState({
        bold: false,
        bulletList: false,
        orderedList: false,
    });

    useEffect(() => {
        if (!editor) return;

        const updateActive = () => {
            setActive({
                bold: !!editor.isActive("bold"),
                bulletList: !!editor.isActive("bulletList"),
                orderedList: !!editor.isActive("orderedList"),
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

    if (!editor) return null;


    return (
        <div className='flex flex-col gap-1.5'>
            {label && <FieldLabel>{label}</FieldLabel>}
            <div className="w-full border border-border rounded-md bg-card">
                <div className="flex gap-2 bg-secondary/50 rounded-t-md p-2 border-b border-border">
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
                </div>

                <EditorContent
                    editor={editor}
                    className="tiptap-editor max-w-none min-h-40 p-2"
                />
            </div>
        </div>
    );
}


export default RichTextEditor;