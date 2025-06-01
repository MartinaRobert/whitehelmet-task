import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PetsaleService } from '../petsale.service';
import { EChartsOption } from 'echarts';
import moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pet-sales',
  templateUrl: './pet-sales.component.html',
  styleUrl: './pet-sales.component.scss'
})
export class PetSalesComponent implements OnInit , AfterViewInit{
  chartOptions: EChartsOption = {};
  summeryDetails:any;
  searchData:any = new Date();
  searchDaily: any = new Date();
    displayedColumns: string[] = ['date','animal','price'];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
     
  constructor(private petSalesService:PetsaleService,private toastr:ToastrService){}
  ngOnInit(): void {
   
    this.getChartData(moment(this.searchData).format('YYYY-MM-DD'));
    this.getDetailedData(moment(this.searchDaily).format('YYYY-MM-DD'));
   
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  drawChart(){
    this.chartOptions = {
      title: {
        text: 'Weekly sales'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: this.summeryDetails.series.map((s: any) => s.name) 
      },
      xAxis: {
        type: 'category',
        data: this.summeryDetails.categories 
      },
      yAxis: {
        type: 'value'
      },
      series: this.summeryDetails.series.map((s: any) => ({
        name: s.name,
        type: 'line',  
        data: s.data, 
        smooth: true 
      }))
    };
  }
  getChartData(date:any){
    this.petSalesService.getSummary(date).subscribe((result:any)=>{
      this.summeryDetails = result;
      if(result.length >0){
        this.toastr.success('data loaded successfully')
      }
      this.drawChart();
    })
  }
  getDetailedData(date:any){
    this.petSalesService.getDetails(date).subscribe((result:any)=>{
      this.dataSource.data=result
      if(result.length >0){
        this.toastr.success('data loaded successfully')
      }
    })
  }
  onDatepickerClosed(isChart:boolean , datePicked:Date){
    let date = moment(datePicked).format('YYYY-MM-DD')
    if(isChart){
      this.getChartData(date);
    }else{
      this.getDetailedData(date)
    }
  }
}
