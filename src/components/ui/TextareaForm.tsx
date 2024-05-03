import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function TextareaForm({ setValue }: { setValue: any }) {
  return (
    <div className="grid w-full gap-1.5">
      <Label
        htmlFor="message-2 "
        className="block mb-1 text-sm font-normal text-[#949493]"
      >
        Invite people
      </Label>
      <Textarea
        placeholder="someone@example.com someone@example.com..."
        id="message-2"
        className="placeholder:text-sm placeholder:font-extralight placeholder:bg-[#FFFEFC]"
        onChange={(e: any) => setValue(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">
        Type or paste in one or multiple emails separated by commas, spaces, or
        line breaks.
      </p>
    </div>
  );
}
