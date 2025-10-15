import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const reportSections = [
  {
    title: "Cover Page",
    description: "Team Name, Institution, Domain, Date",
  },
  {
    title: "Executive Summary",
    description: "100–150 words: Problem, Approach, Solution, Expected Impact",
  },
  {
    title: "Problem Understanding",
    description: "Context, Scenario, Challenges, Impact",
  },
  {
    title: "Proposed Solution Idea",
    description: "Objective, Features, Novelty",
  },
  {
    title: "Diagram & Feasibility",
    description: "Architecture, Impact, Scalability",
  },
];

const ReportSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-primary" />
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            ROUND 1 REPORT STRUCTURE
          </h2>
          <p className="font-inter text-sm sm:text-base text-muted-foreground">
            The blueprint for your solution
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {reportSections.map((section, index) => {
            const isExpanded = expandedIndex === index;
            
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center font-orbitron text-xs sm:text-sm text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-orbitron text-base sm:text-xl font-bold text-left">
                      {section.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "transition-all duration-300 overflow-hidden",
                    isExpanded ? "max-h-48" : "max-h-0"
                  )}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2">
                    <div className="pl-0 sm:pl-14">
                      <p className="font-inter text-sm sm:text-base text-foreground/80 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReportSection;
