import { cn } from "@/lib/utils";
import { useTranslation } from "@/shims/i18n";

function Stepper({ steps, currentStep, className, connectorClassName }) {
  const { t } = useTranslation("common");
  return (
    <div
      className={cn("flex items-start gap-[5px]", className)}
      role="list"
      aria-label={t("Progress")}
    >
      {steps.map((label, i) => {
        const stepNumber = i + 1;
        const isActive = stepNumber === currentStep;
        const isComplete = stepNumber < currentStep;
        const isReached = stepNumber <= currentStep;

        return (
          <div key={label} className="flex items-start gap-[5px]">
            <div
              className="flex flex-col items-center w-[32px] shrink-0"
              role="listitem"
              aria-current={isActive ? "step" : undefined}
            >
              <div
                className="flex items-center justify-center rounded-full size-[32px] transition-colors"
                style={{
                  backgroundColor: isReached ? "var(--color-brand-blue-01)" : "#aecdff",
                }}
              >
                <span
                  className="font-bold text-base-white whitespace-nowrap"
                  style={{ fontSize: "14px", lineHeight: "2" }}
                >
                  {stepNumber}
                </span>
              </div>
              <span
                className="whitespace-nowrap"
                style={{
                  fontSize: "14px",
                  lineHeight: "2",
                  fontWeight: isReached ? 700 : 500,
                  color: isReached
                    ? "var(--color-neutral-900)"
                    : "var(--color-neutral-600)",
                  opacity: isReached ? 1 : 0.5,
                }}
              >
                {label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div className={cn("flex items-center justify-center h-[32px] w-[80px] shrink-0", connectorClassName)}>
                <div
                  className="h-[2px] w-full rounded-full transition-colors"
                  style={{
                    backgroundColor: isComplete ? "var(--color-brand-blue-01)" : "#aecdff",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { Stepper };
