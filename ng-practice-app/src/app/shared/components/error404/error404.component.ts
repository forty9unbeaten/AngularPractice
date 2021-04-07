import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit, AfterViewInit {

  @ViewChild('errorImg') errorImage: ElementRef;

  private images: string[] = [
    'https://i.pinimg.com/originals/8a/5e/a0/8a5ea0b08c036ae9769d10b343622691.jpg',
    'https://4.bp.blogspot.com/-jemezuHYthI/U_Aa1EKSU1I/AAAAAAABb3I/LWemkPE1FGw/s1600/facepalm_bear-2012_animal_Featured_Wallpaper_1152x864.jpg',
    'https://i0.kym-cdn.com/photos/images/original/000/222/136/1324684271001.jpg',
    'https://2.bp.blogspot.com/-U3_isYb-Bl8/Tf32zXg_FyI/AAAAAAAAMx8/o5gr2oHPWjE/s1600/Funny_animals_facepalm_08.jpg',
    'https://i.pinimg.com/originals/86/67/6b/86676b9249c5147fb526676665b0214a.jpg'
  ];

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const randomIndex = (Math.floor(Math.random() * 5) + 1) - 1;
    this.renderer.setStyle(
      this.errorImage.nativeElement, 
      'backgroundImage', 
      `url(${this.images[randomIndex]})`);
  }
}
