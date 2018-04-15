import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';

/**
 * Generated class for the ProdutoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.findById(produto_id).subscribe(res => {
      this.item = res;
      this.getImageUrlIfExist();
    }, error => {
      this.navCtrl.pop();
    });

  }

  getImageUrlIfExist(){
    this.produtoService.getImageFromBucket(this.item.id).subscribe(res=>{
      this.item.imageUrl =`${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
    },error=>{

    });
  }

}
