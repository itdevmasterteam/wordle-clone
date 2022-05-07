import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wordle-clone';
  currectSolution='SUPER'
  // keyboard = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','BACKSPACE']
  keyboard=[
    {key:'Q',class:''},
    {key:'W',class:''},
    {key:'E',class:''},
    {key:'R',class:''},
    {key:'T',class:''},
    {key:'Y',class:''},
    {key:'U',class:''},
    {key:'I',class:''},
    {key:'O',class:''},
    {key:'P',class:''},
    {key:'A',class:''},
    {key:'S',class:''},
    {key:'D',class:''},
    {key:'F',class:''},
    {key:'G',class:''},
    {key:'H',class:''},
    {key:'J',class:''},
    {key:'K',class:''},
    {key:'L',class:''},
    {key:'ENTER',class:''},
    {key:'Z',class:''},
    {key:'X',class:''},
    {key:'C',class:''},
    {key:'V',class:''},
    {key:'B',class:''},
    {key:'N',class:''},
    {key:'BACKSPACE',class:''}
    ]
  
  boxes =[
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],



  ]
  currentRow=0;
  currentRowIndex=0;

  
  
  //handle click when a key is pressed
  handleClick(key:any){
    console.log('clicked'+key);
    //when key is enter
    if(key==='ENTER'){
      console.log('clicked key is enter')
      this.submittingData()
      return
    }
    //when key is backspace
    if(key ==='BACKSPACE'){
      if(this.currentRowIndex>0){
        console.log('clicked key is backspace')
        this.removeItemsFromRow(key)
      }
      return
    }
    if(this.currentRow<6&&this.currentRowIndex<5){
      this.boxes[this.currentRow][this.currentRowIndex] ={class:'',key:key};
      console.log('box',this.boxes)
      this.currentRowIndex++

    }

  }

  //functiom called when backspace pressed
  removeItemsFromRow(letter:any){
    console.log('clicked backespace')
    let arrayToBePushed:any
    //makking string from array, to be removed when backspace clicked
   let formattedString= this.boxes[this.currentRow].map((letterItem,index)=>{
      console.log({letterItem:letterItem.key})
      return letterItem.key
   }).join('');
   console.log({formattedString})
   //getting the word to be removed
   let removedString=formattedString[formattedString.length-1]
   //replacing the word
   formattedString=formattedString.replace(removedString,'')
   //make string to an array and push back to the initial array
   arrayToBePushed= formattedString.split('')
   
   
   arrayToBePushed=arrayToBePushed.map((item:any)=>{
     console.log({item})
     return {
       class:'',
       key:item
      }
    }
    );
    console.log({formattedString,removedString,arrayToBePushed})
   arrayToBePushed = [...arrayToBePushed,...Array(5-arrayToBePushed.length)]
   arrayToBePushed=arrayToBePushed.map((item:any)=>{
     let object={
       class:'',
       key:''
     }
    if(item===undefined){
      item=object
    }
    return item
  })
  console.log({arrayToBePushed})
   this.boxes[this.currentRow] = arrayToBePushed
   this.currentRowIndex--
   console.log({arrayToBePushed,boxes:this.boxes,curr:this.currentRowIndex})
  }


  //called when enter is pressed
  submittingData(){
    console.log('enter key pressed')
    let clonedCurrentSloution = this.currectSolution
    //1- rowIndex should be 5
    if(this.currentRowIndex===5&&this.currentRow<6){
      //getting the actual string from submitted data
      let actualString = this.boxes[this.currentRow].join('');
      console.log({actualString})
      //cheking actual string and typed string ===
      if(this.currectSolution===actualString){
        alert('types tring is equal to our actual string success...')
        return
      }
      //adding colours

      //mapping threw the currect array & check if character is in same index
      this.boxes[this.currentRow].forEach((letter:any,index)=>{
        if(letter.key==this.currectSolution[index]){
          let data=this.currectSolution[index]
          letter.class='green'
          this.addColorToKey(letter.key,'green')
          clonedCurrentSloution= clonedCurrentSloution.replace(data,'')
          console.log({letter,index})
        }
      })
      
      //checking if word exist
      this.boxes[this.currentRow].forEach((letter:any,index)=>{
        if(clonedCurrentSloution.includes(letter.key)){
          letter.class='yellow'
          this.addColorToKey(letter.key,'yellow')

          clonedCurrentSloution= clonedCurrentSloution.replace(letter.key,'')
        }
      })

      //if nothing matches
      this.boxes[this.currentRow].forEach((letter:any,index)=>{
        if(letter.class===''){
          this.addColorToKey(letter.key,'grey')
          letter.class='grey'
        }
      })

      console.log({first:this.boxes[this.currentRow],clonedCurrentSloution})
      //setting row and rowIndex to next row and index 0
      this.currentRow++
      this.currentRowIndex=0
    }
  }

  addColorToKey(letter:any,color:any){
    this.keyboard.map((item,index)=>{
      if(item.key===letter){
        item.class= color
      }
    })

  }
}
