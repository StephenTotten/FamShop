import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroceryRoutingModule } from './grocery-routing-module';
import { ListPage } from './pages/list-page/list-page';

@NgModule({
  declarations: [ListPage],
  imports: [
    CommonModule, 
    GroceryRoutingModule,
    FormsModule],
})
export class GroceryModule {}
