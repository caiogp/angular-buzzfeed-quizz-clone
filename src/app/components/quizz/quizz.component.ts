import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:number[] = []
  answerSelected:string =""

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

  }

  playerChoose(value:number){
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:number = await this.checkResult(this.answers)
      this.finished = true
      if (finalAnswer<8) {
        this.answerSelected="Ansiedade Baixa"
      } else {if (finalAnswer<17) {
               this.answerSelected="Ansiedade Média"

              } else {if (finalAnswer<27) {
                      this.answerSelected="Ansiedade Alta"

                     } else {
                         this.answerSelected="Ansiedade Severa"
                        }

               }

      }
    }
  }

  async checkResult(anwsers:number[]){

    const result = anwsers.reduce((previous, current)=>{
      return previous+current
    })

    return result
  }

}
