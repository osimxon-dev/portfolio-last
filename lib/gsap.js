'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, useGSAP);
}

/** Fade-and-rise for [data-rise] elements and masked headline lines inside `root`. */
export function reveal(root) {
  root.querySelectorAll('[data-rise]').forEach((el) => {
    gsap.from(el, {
      y: 50,
      autoAlpha: 0,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  root.querySelectorAll('.mask > span').forEach((el) => {
    gsap.from(el, {
      yPercent: 110,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: el.parentElement, start: 'top 90%' },
    });
  });
}

export { gsap, ScrollTrigger, Draggable, useGSAP };
