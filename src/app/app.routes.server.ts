import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'course/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: "home" },
        { slug: "about" },
        { slug: "contact" },
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
