import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({ className, ...props }) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-16", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group/accordion-item bg-white rounded-sm overflow-hidden cursor-pointer transition-shadow duration-200",
        "border border-transparent shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]",
        "hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] hover:border-neutral-200",
        "data-[state=open]:border-brand-blue-500 data-[state=open]:shadow-none",
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between w-full px-24 py-16 text-left gap-16 outline-none cursor-pointer",
          "font-medium text-neutral-900 transition-colors duration-200",
          "data-[state=open]:text-brand-blue-500",
          "[&_.icon-plus]:block [&_.icon-minus]:hidden",
          "data-[state=open]:[&_.icon-plus]:hidden data-[state=open]:[&_.icon-minus]:block",
          "text-body-xlarge leading-body",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <Minus size={24} className="icon-minus text-brand-blue-500 shrink-0" />
        <Plus size={24} className="icon-plus shrink-0 text-neutral-900 group-hover/accordion-item:text-brand-blue-500 transition-colors duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
      {...props}
    >
      <div className="mx-24 border-t border-neutral-200" />
      <div
        className={cn("px-24 pb-24 pt-20 text-body-large leading-body text-neutral-600", className)}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
