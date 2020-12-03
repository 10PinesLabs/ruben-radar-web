import {RadarTemplateContainer} from './radarTemplateContainer';

export class RadarTemplateContainerFilter {
  filterType: filterType = filterType.ALL;
  search = '';

  constructor(filter: filterType = filterType.ALL, searchText: string = '') {
    this.filterType = filter;
    this.search = searchText;
  }

  private static searchInText(text: string, textToSearch: string): boolean {
    return text.toUpperCase().includes(textToSearch.toUpperCase());
  }

  filterContainers(
    radarTemplateContainers: RadarTemplateContainer[]
  ): RadarTemplateContainer[] {
    return radarTemplateContainers.filter((radarTemplateContainer) =>
       this.isContainerOfTheFilteredType(radarTemplateContainer) &&
      (this.contanerHasSearchedName(radarTemplateContainer) ||
      this.containerHasATemplateWithSearchedName(radarTemplateContainer))
    );
  }

  containerHasATemplateWithSearchedName(radarTemplateContainer: RadarTemplateContainer): unknown {
    if (!this.search) { return true; }
    return radarTemplateContainer.radar_templates
    .find(radarTemplate => RadarTemplateContainerFilter.searchInText(radarTemplate.name, this.search));
  }

  contanerHasSearchedName(radarTemplateContainer: RadarTemplateContainer): boolean {
    if (!this.search) { return true; }
    return RadarTemplateContainerFilter.searchInText(radarTemplateContainer.name, this.search);
  }

  private isContainerOfTheFilteredType(radarTemplateContainer: RadarTemplateContainer) {
    switch (this.filterType) {
      case filterType.ALL: {
        return true;
      }
      case filterType.INACTIVE: {
        return radarTemplateContainer.isInactive();
      }
      case filterType.ACTIVE: {
        return radarTemplateContainer.isActive();
      }
      case filterType.DELETED: {
        return radarTemplateContainer.isClosed();
      }
    }
  }
}

export enum filterType {
  "ALL",
  "INACTIVE",
  "ACTIVE",
  "DELETED"
}
