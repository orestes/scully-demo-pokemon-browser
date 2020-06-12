import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

import {PokeAPIService} from '../../services/poke-api.service';

import {PokeAPIResult} from '../../services/poke-api.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  public pokemonList$: Observable<PokeAPIResult[]>;

  private limit = 10;

  constructor(
    private pokemonService: PokeAPIService
  ) { }

  ngOnInit(): void {
    this.pokemonList$ = this.pokemonService.getList(this.limit);
  }

}
