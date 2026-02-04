import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Meta } from '@angular/platform-browser';

const SITE_NAME = 'Ostrowski-dev';
const BASE_URL = 'https://ostrowski-dev.pl';

export interface SeoRouteData {
  title: string;
  description?: string;
}

@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const data = this.getRouteData(snapshot) as SeoRouteData | undefined;
    const title = data?.title;
    const description = data?.description;

    if (title) {
      const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
      this.title.setTitle(fullTitle);
    }

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }

    if (title) {
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ name: 'twitter:title', content: title });
    }

    const url = this.getCanonicalUrl(snapshot);
    this.meta.updateTag({ property: 'og:url', content: url });
    this.updateCanonicalLink(url);
  }

  private getRouteData(snapshot: RouterStateSnapshot): unknown {
    let route = snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data;
  }

  private getCanonicalUrl(snapshot: RouterStateSnapshot): string {
    const path = (snapshot.url || '').replace(/^\//, '');
    const base = typeof document !== 'undefined' ? document.location.origin : BASE_URL;
    return path ? `${base}/${path}` : `${base}/`;
  }

  private updateCanonicalLink(url: string): void {
    const existing = document.querySelector('link[rel="canonical"]');
    if (existing) {
      existing.setAttribute('href', url);
    } else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
  }
}
