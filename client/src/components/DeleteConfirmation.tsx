import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function DeleteConfirmation({
  open,
  onOpenChange,
  onConfirm,
}: DeleteConfirmationProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <div className="flex justify-center mb-3">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <AlertDialogTitle className="text-xl font-semibold text-neutral-500">
            本当に削除しますか？
          </AlertDialogTitle>
          <AlertDialogDescription className="text-neutral-400">
            この操作は元に戻せません。このアイデアを完全に削除してもよろしいですか？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center space-x-3">
          <AlertDialogCancel className="text-neutral-400 font-medium hover:text-neutral-500 border border-neutral-200">
            キャンセル
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-destructive text-white font-medium hover:bg-destructive/90" 
            onClick={onConfirm}
          >
            削除する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
