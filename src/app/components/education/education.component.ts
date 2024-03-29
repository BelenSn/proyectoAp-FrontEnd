import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  public educations: Education[] = []; //array para recorrer en el html *ngFor="let education of educations"
  public editEducation: Education | undefined;
  public deleteEducation: Education | undefined;
  

  constructor(private educationService: EducationService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getEducation();
  }

  isLogged(){
    return this.loginService.isLogged();
  }

  public getEducation():void{
    this.educationService.getEducation().subscribe({
      next:(response:Education[]) =>{
        this.educations = response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
      
    })
  }

  public onOpenModal(mode:string, education? : Education): void{
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle','modal');

    if (mode === 'add'){
      button.setAttribute('data-bs-target', '#addEducationModal');
    
    } else if (mode === 'edit'){
      this.editEducation = education;
      button.setAttribute('data-bs-target','#editEducationModal');
    
    }else if (mode === 'delete'){
      this.deleteEducation = education;
      button.setAttribute('data-bs-target','#deleteEducationModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddEducation(addForm: NgForm): void{
    
    document.getElementById('add-education-form')?.click();
    
    this.educationService.addEducation(addForm.value).subscribe({
      
      next: (response: Education) => {
        console.log(response);
        this.getEducation();
        addForm.reset();
      },
      
      error:(error: HttpErrorResponse) => {        
        alert(error.message);
        addForm.reset();
      }
      
    })
  }
    
  public onEditEducation(education: Education): void{

    this.editEducation = education;    
    
    this.educationService.editEducation(education).subscribe({
      
      next: (response: Education) => {
        console.log(response);
        this.getEducation();        
      },

      error:(error: HttpErrorResponse) => {        
        alert(error.message);        
      }
    })
  }

  public onDeleteEducation(idEducation: number): void{    
    
    this.educationService.deleteEducation(idEducation).subscribe({
      
      next: (response: void) => {
        console.log(response);
        this.getEducation();        
      },

      error:(error: HttpErrorResponse) => {        
        alert(error.message);        
      }
    })
  }

}
