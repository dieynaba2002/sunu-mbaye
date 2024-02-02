import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'produitCateg',
})
export class ProduitCategPipe implements PipeTransform {

  transform(produit_id: number, produit: any[]): string {
    const prod = produit.find((p) => p.id === produit_id);
    return prod ? prod.prixU : 'N/A';
  }
}
