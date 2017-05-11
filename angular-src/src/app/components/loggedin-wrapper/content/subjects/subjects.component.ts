import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tests',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  tests = [];
  subjects = [];
  expandedSubject: String;

  constructor() { }

  ngOnInit() {
    this.generateTestSubjects();
  }

  toggleCollapse(code) {
    if (this.expandedSubject != code) {
      this.expandedSubject = code;
    } else {
      this.expandedSubject = null;
    }
  }

  isExpanded(code) {
    return this.expandedSubject == code;
  }

  trim(string) {
      return string.replace(" ", "");
  }

  generateTestSubjects() {
    this.tests.push({name: "Harjutustest 1"});
    this.tests.push({name: "Harjutustest 2"});
    this.tests.push({name: "Harjutustest 3"});
    this.tests.push({name: "Harjutustest 4"});
    this.tests.push({name: "Harjutustest 5"});
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
    this.subjects.push({code: "MTAT.01.126", name: "Infotehnoloogia sotsiaalsed aspektid", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.124", name: "Kõrgem matemaatika II", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.125", name: "Sissejuhatus informaatikasse", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.127", name: "Operatsioonisüsteemid", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.128", name: "Tõenäosusteooria", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.129", name: "Tõenäosusteooria", testCount: 19, questionCount: 140, tests: this.tests});
    this.subjects.push({code: "MTAT.01.130", name: "Tõenäosusteooria", testCount: 19, questionCount: 140, tests: this.tests});
  }

}
