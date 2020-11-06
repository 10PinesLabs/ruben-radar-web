import {Component, Input, OnInit} from '@angular/core';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-share-container-form',
  templateUrl: './share-container-form.component.html',
  styleUrls: ['./share-container-form.component.scss']
})

export class ShareContainerForm implements OnInit {
  @Input() radarTemplateContainer;
  @Input() usersDropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  notEnoughUsersSelected: boolean = false;

  constructor() {}

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'email',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Busqueda de usuarios',
      noDataAvailablePlaceholderText: 'No se encontraron usuarios'
    };

  }
  
  onItemSelect(item: any) {
    this.notEnoughUsersSelected = this.selectedItems.length === 0;
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  submitAction() {
    if (this.validSelection()) {
      const users_ids = this.selectedItems.map(user => user.id);
      return this.userService.share(this.radarTemplateContainer.id, users_ids);
    }
  }

  validSelection() {
    this.notEnoughUsersSelected = this.selectedItems.length === 0;
    return !this.notEnoughUsersSelected;
  }

  closeModal() {
    this.selectedItems = [];
  }

}
