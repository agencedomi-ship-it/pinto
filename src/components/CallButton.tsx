import { usePhone } from "@/lib/phone";

export function CallButton({
  variant = "primary",
  className = "",
  full = false,
}: {
  variant?: "primary" | "outline" | "gold";
  className?: string;
  full?: boolean;
}) {
  const phone = usePhone();
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-4 text-base font-semibold tracking-tight transition active:scale-[0.98]";
  const styles =
    variant === "gold"
      ? "bg-gold text-gold-foreground shadow-lg shadow-gold/30 hover:bg-gold/90"
      : variant === "primary"
        ? "bg-foreground text-background shadow-md shadow-foreground/10 hover:bg-foreground/90 ring-1 ring-gold/30"
        : "border border-border bg-card text-foreground hover:border-foreground";
  return (
    <a href={`tel:${phone.tel}`} className={`${base} ${styles} ${full ? "w-full" : ""} ${className}`}>
      {phone.display}
    </a>
  );
}
