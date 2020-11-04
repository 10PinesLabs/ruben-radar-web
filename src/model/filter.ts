import { RadarTemplateContainer } from "./radarTemplateContainer";

export class Filter {
  filterType: filterType = filterType.ALL;
  search: string = "";

  constructor(filter: filterType = filterType.ALL, searchText: string = "") {
    this.filterType = filter;
    this.search = searchText;
  }

  filterContainers(
    radarTemplateContainers: RadarTemplateContainer[]
  ): RadarTemplateContainer[] {
    return radarTemplateContainers.filter((radarTemplateContainer) =>
      this.isContainerOfTheFilteredType(radarTemplateContainer)
    );
  }

  private isContainerOfTheFilteredType(radarTemplateContainer: RadarTemplateContainer) {
    switch (this.filterType) {
      case filterType.ALL: {
        return true;
      }
      case filterType.CLOSED: {
        return radarTemplateContainer.active ? false : true;
      }
      case filterType.OPEN: {
        return radarTemplateContainer.active ? true : false;
      }
    }
  }
}

export enum filterType {
  "ALL",
  "CLOSED",
  "OPEN",
}
