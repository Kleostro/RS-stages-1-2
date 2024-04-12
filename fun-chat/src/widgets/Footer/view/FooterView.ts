import createSVGUse from '../../../utils/createSVGUse.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import {
  LINK_ATTRIBUTES,
  FOOTER_SVG_DETAILS,
  FOOTER_YEAR,
} from '../types/enums.ts';
import FOOTER_STYLES from './footer.module.scss';

class FooterView {
  private appYear: HTMLSpanElement;

  private githubLogo: SVGSVGElement;

  private githubLink: HTMLAnchorElement;

  private rsLogo: SVGSVGElement;

  private rsLink: HTMLAnchorElement;

  private footer: HTMLElement;

  constructor() {
    this.appYear = this.createAppYear();
    this.githubLogo = this.createGithubLogo();
    this.githubLink = this.createGithubLink();
    this.rsLogo = this.createRSLogo();
    this.rsLink = this.createRSLink();
    this.footer = this.createHTML();
  }

  public getHTML(): HTMLElement {
    return this.footer;
  }

  private createAppYear(): HTMLSpanElement {
    this.appYear = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [FOOTER_STYLES.appYear],
      innerContent: FOOTER_YEAR,
    });

    return this.appYear;
  }

  private createGithubLogo(): SVGSVGElement {
    this.githubLogo = document.createElementNS(
      FOOTER_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG,
    );

    this.githubLogo.append(createSVGUse(FOOTER_SVG_DETAILS.GITHUB_ID));

    return this.githubLogo;
  }

  private createGithubLink(): HTMLAnchorElement {
    this.githubLink = createBaseElement({
      tag: TAG_NAMES.A,
      cssClasses: [FOOTER_STYLES.githubLink],
      attributes: {
        href: LINK_ATTRIBUTES.GITHUB_HREF,
        target: LINK_ATTRIBUTES.TARGET_BLANK,
      },
    });

    this.githubLink.append(this.githubLogo);

    return this.githubLink;
  }

  private createRSLogo(): SVGSVGElement {
    this.rsLogo = document.createElementNS(
      FOOTER_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG,
    );

    this.rsLogo.append(createSVGUse(FOOTER_SVG_DETAILS.RS_ID));

    return this.rsLogo;
  }

  private createRSLink(): HTMLAnchorElement {
    this.rsLink = createBaseElement({
      tag: TAG_NAMES.A,
      cssClasses: [FOOTER_STYLES.rsLink],
      attributes: {
        href: LINK_ATTRIBUTES.RS_HREF,
        target: LINK_ATTRIBUTES.TARGET_BLANK,
      },
    });

    this.rsLink.append(this.rsLogo);

    return this.rsLink;
  }

  private createHTML(): HTMLElement {
    this.footer = createBaseElement({
      tag: TAG_NAMES.FOOTER,
      cssClasses: [FOOTER_STYLES.footer],
    });

    this.footer.append(this.rsLink, this.githubLink, this.appYear);
    return this.footer;
  }
}

export default FooterView;
