import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wordle-clone';
  keyboard = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','BACKSPACE']
  boxes =[
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
  ]
  currentRow=0;
  currentRowIndex=0;
  
  //handle click when a key is pressed
  handleClick(key:any){
    console.log('clicked'+key);
    //when key is enter
    if(key==='ENTER'){
      console.log('clicked key is enter')
      return
    }
    //when key is backspace
    if(key ==='BACKSPACE'){
      console.log('clicked key is backspace')
      this.removeItemsFromRow(key,this.currentRowIndex)
      return
    }
    if(this.currentRow<6&&this.currentRowIndex<5){
      this.boxes[this.currentRow][this.currentRowIndex] =key;
      console.log('box',this.boxes)
      this.currentRowIndex++

    }

  }

  //functiom called when backspace pressed
  removeItemsFromRow(letter:any,currentRownIndex:any){
    console.log('clicked backespace')
    let arrayToBePushed:any
    //makking string from array, to be removed when backspace clicked
   let formattedString= this.boxes[this.currentRow].join('');
   //getting the word to be removed
   let removedString=formattedString[formattedString.length-1]
   //replacing the word
   formattedString=formattedString.replace(removedString,'')
   console.log({formattedString,removedString})
   //make string to an array and push back to the initial array
    arrayToBePushed= formattedString.split('');
   arrayToBePushed = [...arrayToBePushed,...Array(5-arrayToBePushed.length)]
   this.boxes[this.currentRow] = arrayToBePushed
   this.currentRowIndex--
   console.log({arrayToBePushed,boxes:this.boxes,currentRownIndex})
  

  }
}
