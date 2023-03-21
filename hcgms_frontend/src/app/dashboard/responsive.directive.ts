import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[resposive]',
})
export class ResponsiveDirective{
    screenWidth:any;
    screenHeight:any;
    toggleValue: boolean = false;
    @Output() onToggle = new EventEmitter<boolean>();
    @HostListener('window:resize', ['$event'])
    onResize(event:any) {  
        this.screenWidth = window.innerWidth;  
        this.screenHeight = window.innerHeight;
        if(this.screenWidth > 1136 || this.screenWidth < 1136){
        this.toggleValue = false;
        }
        this.onToggle.emit(this.toggleValue);
    }
}