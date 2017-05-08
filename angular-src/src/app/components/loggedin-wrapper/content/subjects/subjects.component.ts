import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tests',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  tests = [];
  subjects = [];

  constructor() { }

  ngOnInit() {
    this.generateTestSubjects();
  }

  generateTestSubjects() {
    this.tests.push({name: "Harjutustest 1", path: "/MATAT_03_133/test1"});
    this.tests.push({name: "Harjutustest 2", path: "/MATAT_03_133/test2"});
    this.tests.push({name: "Harjutustest 3", path: "/MATAT_03_133/test3"});
    this.tests.push({name: "Harjutustest 4", path: "/MATAT_03_133/test4"});
    this.tests.push({name: "Harjutustest 5", path: "/MATAT_03_133/test5"});
    this.subjects.push({
      code: "MTAT.03.133",
      name: "Algoritmid ja andmestruktuurid",
      testCount: 10,
      questionCount: 56,
      tests: this.tests});
    this.subjects.push({code: "MTAT.02.123", name: "Kõrgem matemaatika I", testCount: 15, questionCount: 90, tests: this.tests});
    this.subjects.push({code: "MTAT.01.443", name: "Tõenäosusteooria", testCount: 2, questionCount: 23, tests: this.tests});
    this.subjects.push({code: "MTAT.07.334", name: "Andmeturve", testCount: 4, questionCount: 36, tests: this.tests});
    this.subjects.push({code: "MTAT.05.884", name: "Automaadid, keeled ja translaatorid", testCount: 13, questionCount: 98, tests: this.tests});
    this.subjects.push({code: "MTAT.01.743", name: "Infotehnoloogia sotsiaalsed aspektid", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.743", name: "Kõrgem matemaatika II", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.743", name: "Sissejuhatus informaatikasse", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.743", name: "Operatsioonisüsteemid", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.743", name: "Tõenäosusteooria", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.743", name: "Tõenäosusteooria", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.743", name: "Tõenäosusteooria", testCount: 19, questionCount: 140, tests: this.tests});
  }

}
