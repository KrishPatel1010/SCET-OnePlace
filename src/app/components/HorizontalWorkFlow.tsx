"use client"
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { workflowSteps } from './workflow';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HorizontalWorkflowSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    const steps = stepsRef.current;

    if (!container || !horizontal || !steps) return;

    // Calculate the total width needed for horizontal scroll
    const stepWidth = 500; // Width of each step card
    const stepGap = 32; // Gap between steps
    const totalWidth = (stepWidth + stepGap) * workflowSteps.length - stepGap;

    // Set up horizontal scroll animation
    const horizontalScroll = gsap.to(steps, {
      x: -totalWidth + window.innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Animate step cards on scroll
    workflowSteps.forEach((_, index) => {
      gsap.fromTo(`.step-card-${index}`, 
        {
          scale: 0.8,
          y: 50
        },
        {
          scale: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: container,
            start: `top+=${index * (totalWidth / workflowSteps.length)} top`,
            end: `top+=${(index + 1) * (totalWidth / workflowSteps.length)} top`,
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={horizontalRef} className="h-screen bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Progress indicator */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <p className="text-white font-medium">Scroll to explore the workflow →</p>
          </div>
        </div>

        <div ref={stepsRef} className="flex items-center h-full relative z-10" style={{ width: 'max-content' }}>
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Workflow Step Card - Inline Component */}
              <div className={`step-card-${index} flex-shrink-0 w-96 mx-4`}>
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
                  <div className={`${step.bgColor} p-8 text-center relative`}>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-medium text-gray-700">Step {step.id}</span>
                    </div>
                    <div className={`${step.color} mb-6 flex justify-center`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  <div className="p-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Activities:</h4>
                    <div className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center">
                          <div className={`w-2 h-2 ${step.bgColor} rounded-full mr-3`}></div>
                          <span className="text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow between steps */}
              {index < workflowSteps.length - 1 && (
                <div className="flex-shrink-0 mx-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalWorkflowSection;