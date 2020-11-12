import { RadarTemplateContainer } from "./radarTemplateContainer";

export class RadarTemplateContainerFilter {
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
       this.isContainerOfTheFilteredType(radarTemplateContainer) &&
      (this.contanerHasSearchedName(radarTemplateContainer) ||
      this.containerHasATemplateWithSearchedName(radarTemplateContainer))
    );
  }
  
  containerHasATemplateWithSearchedName(radarTemplateContainer: RadarTemplateContainer): unknown {
    if(!this.search) return true
    return radarTemplateContainer.radar_templates.find(radarTemplate => this.searchInText(radarTemplate.name, this.search))
  }

  contanerHasSearchedName(radarTemplateContainer: RadarTemplateContainer): boolean {
    if(!this.search) return true
    return this.searchInText(radarTemplateContainer.name, this.search)
  }

  private searchInText(text : string, textToSearch : string) : boolean{
    return text.toUpperCase().includes(textToSearch.toUpperCase())
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
