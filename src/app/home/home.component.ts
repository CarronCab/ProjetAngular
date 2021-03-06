import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Film} from '../services/film.interface';
import {FilmsService} from '../services/films.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  nowplaying: Film[] = [];
  popular: Film[] = [];
  sub: Subscription;
  keyWord: string;
  mySubscription: any;

  constructor(private filmService: FilmsService, private route: ActivatedRoute, private router: Router) {

    // tslint:disable-next-line:only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

  }

  ngOnInit() {

    this.sub = this.route
      .queryParams
      .subscribe(params => {
          this.keyWord = params.keyWord;
        }
      );

    if (!this.keyWord) {
      this.filmService.getPopular().subscribe((res: any) => {
        const data = res.results;
        data.forEach(element => {
          this.popular.push(element);
        });
      });
    } else {
      this.popular.length = 0;
      this.popular = [];
      this.filmService.getMovies(this.keyWord).subscribe((res: any) => {
        const data = res.results;
        data.forEach(element => {
          this.popular.push(element);
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  viewDetail(filmId: number) {
    this.router.navigate([`/details/${filmId}`]);
  }
}
