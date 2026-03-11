"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteArticleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleTitle: string;
  onConfirm: () => void;
}

export default function DeleteArticleModal({
  open,
  onOpenChange,
  articleTitle,
  onConfirm,
}: DeleteArticleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-2">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-center">Delete Article</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              &quot;{articleTitle}&quot;
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row justify-center gap-3 sm:justify-center">
          <button
            onClick={() => onOpenChange(false)}
            className="w-full border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            Cancel
          </button>
          <Button
            
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="min-w-25"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
