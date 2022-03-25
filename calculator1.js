var store=""; // to store all values.
var lastOperId="";  // to store the id of last pressed operator ,to clear the color when equal is pressed
var minusChecker=false;   //to differentiate - as operator and sign in display
var operatorChecker=false;  //to clear color of other operator when new operator is pressed
var countOperator=0;
var opStock="";
var displayData="";
var calculateChecker=false;
var dotCounter=0;

function task(value)
{
    
          var signChecker=store.charAt(store.length-1); 
          var signChecker2=store.charAt(store.length-2); 
//condition for minus operator         
        
	if(value=="-")
	{
	                                          //condition for '-' as sign
	                                 
	   if(store.length==0||signChecker=='+' ||signChecker=='-'||signChecker=='*'||signChecker=='/')
	   {
	          
	          
	          
	          if(store.charAt(0)!='-' && signChecker2!='+'&& signChecker2!='-'&& signChecker2!='*'&& signChecker2!='/')//condtion to prevent -- at start & --- other then start
	          {
	           
                       minusChecker=false;
                       document.getElementById("display").value = "";        
	               document.getElementById("display").value = "-";
	               operator(value);
	             
	             
	          }    // when - used first ex-   -6*-5
	          
	          else if(store.length>1 && store.charAt(0)=='-'&&(signChecker=='+' ||signChecker=='-'||signChecker=='*'||signChecker=='/') && signChecker2!='+'&& signChecker2!='-'&& signChecker2!='*'&& signChecker2!='/')
	          {
	              
	            
                     minusChecker=false;
                     document.getElementById("display").value = "";        
	             document.getElementById("display").value = "-";
	             operator(value);
	             
	          
	          }
	          
	          
	    }                                //condition for '-' as operator
	    else
	    {       
	    
	    if(countOperator==1)
	       {
	       
	           calculate(false);
	           countOperator=0;
	           store=store+opStock;
	           
	           
	       }
	           countOperator++;
	            dotCounter=0;
	           minusChecker=true;
	           operatorChecker=true;
	           operator(value);
	           lastOperId=value; 
	          
	    
	    }
	}
 //conditon of other operator and also prevent them to use at start
 
	else if(store!="-" && store.length>=1 )
	{
	   
	        if(signChecker=='+'||signChecker=='*'||signChecker=='/'||(signChecker=='-'&& signChecker2!='+'&& signChecker2!='-'&& signChecker2!='*'&& signChecker2!='/'))//select last opertaor /+*
	        {      
	        
	               
	               minusChecker=true;
	               operatorChecker=true;
	               var storeSlice=store.slice(0,-1);
	               var displaySlice=displayData.slice(0,-1);
	               store=storeSlice;
	               displayData=displaySlice;
	               if(countOperator==1)
	               {
	       
	                   calculate(false);
	                   countOperator=0;
	                   store=store+opStock;
	           
	           
	              }      
	               countOperator++;
	                dotCounter=0;
	               operator(value);
	               lastOperId=value; 
	        }
	   
	       else if(signChecker!='-')//to prevent operator after +-,*-,/-
	       {     
	       
	       if(countOperator==1)
	       {
	       
	           calculate(false);
	           countOperator=0;
	           store=store+opStock;
	           
	           
	       }
	             countOperator++;
	             dotCounter=0;
	             minusChecker=true;
	             operatorChecker=true;
	             operator(value);
	             lastOperId=value; 
	   
	      }   
	
         } 
         
        
         
       

}


// clrear all color of operator

function clearColor()
{

       elements = document.getElementsByClassName("opera");
       for (var i = 0; i < elements.length; i++)
       {
            elements[i].style.backgroundColor="white";
       }     


}


// function clears all data
function clearScreen()
 {
	document.getElementById("display").value = "0";
	document.getElementById("checker").value = "";
	store="";
	openCount=0;
        closeCount=0;
        dotCounter=0;
        clearColor();
	      
}


// function clears last data

function clearLast()
 {
	
	store=store.slice(0,-1);
	
	if(store!="")
	{
	      document.getElementById("checker").value =store;
	      document.getElementById("display").value ="0";
	}
	else
	{
	     document.getElementById("checker").value ="0";
	     document.getElementById("display").value ="0";
	
	}
	
	clearColor();
	
	       
}


// function clear's the last data till any operator

function clearRecent()
{
	 
    var num=0;
   
    for(var k=store.length-1;k>=0;k--)
    {
        num++;
        
        if(store.charAt(k)=='-'||store.charAt(k)=='*'||store.charAt(k)=='+'||store.charAt(k)=='/')
        {
                           
             store=store.slice(0,- (num-1));
             break;
        } 
                                            
    }
	
    document.getElementById("checker").value =store;
    document.getElementById("display").value ="0"; 
         
}




function clearBefore()
{
	 document.getElementById("display").value = "";	
}


function digits(value) 
{
         
    if(value!='.')
    {
         
         if(minusChecker==true || document.getElementById("display").value=="0")
         {
            document.getElementById("display").value = "";
            minusChecker=false; 
            
         }
          
          document.getElementById("display").value += value;
	    if(calculateChecker==true)
	    {
	        store=store+value;
	        displayData=store;
	         calculateChecker=false;
	    }
	    else
	    {
	           
	             store=store+value;
	             displayData=displayData+value;
	            
	    }
	    document.getElementById("checker").value =displayData;
	   
     }
     else
     {
     
          dotCounter++;
          if(dotCounter==1)
          {
          
          
              
         if(minusChecker==true || document.getElementById("display").value=="0")
         {
            document.getElementById("display").value = "";
            minusChecker=false; 
            
         } 
          document.getElementById("display").value += value;
	    if(calculateChecker==true)
	    {
	        store=store+value;
	        displayData=store;
	        calculateChecker=false;
	    }
	    else
	    {
	           
	             store=store+value;
	             displayData=displayData+value;
	            
	    }
	    document.getElementById("checker").value =displayData;
          
            
          }
          
     }
}

function operator(value)
{
	 if(operatorChecker==true || document.getElementById("display").value=="0")
	 {
	            elements = document.getElementsByClassName("opera");
                    for (var i = 0; i < elements.length; i++)
                    {
                       elements[i].style.backgroundColor="white";
                     }
	             document.getElementById(value).style.backgroundColor="#008080";
	            operatorChecker =false;
	 }
	  
	   if(calculateChecker==true)
	    {
	        store=store+value;
	        displayData=store;
	        calculateChecker=false;
	    }
	    else
	    {
	       store=store+value;
	       displayData=displayData+value;
	    }
	   document.getElementById("checker").value =displayData;
	
}


function calculate(data) {

document.getElementById(lastOperId).style.backgroundColor="white";	
var temArry=[];
var arr=store.split("");
var opStore=[];
var temp1="";
var temp2="";
var count=0;
 
    for(var i=0;i<=store.length;i++)
    {
              if(i==store.length ||arr[i]=="+" || (arr[i]=="-"&& i!=0 && temArry.length!=0)||arr[i]=="/" ||arr[i]=="*")
              {
                         //i==0 store.length is to pop when end is reached in the string
                         
                                      if(i!=store.length)
                                      {
                          
                                         opStore.push(arr[i]);
                              
                                      }
                                  
                                     while(temArry.length>0)  //pop operation
                                     {
                         
                                          temp2=temp2 + temArry.shift();
                                     }
                          
                                     if(temp1=="")
                                     {
                                         temp1=temp2;
                                         temp2="";
                                     }
                           
            }
                
           else //push operation
           {
                        temArry.push(arr[i]);
                    
                            
           }
          
          
          if(temp1!="" && temp2!="")   // if temp1 and temp2 are not equal means switch case will be triggered
          {
              switch(opStore[0])
              {
                  case "+":temp1=+temp1 + +temp2;
                  temp2="";
                  opStore.shift();
                  break;
                  
                  case "-":temp1=+temp1 - +temp2;
                  temp2="";
                  opStore.shift();
                  break;
                  
                  case "/":temp1=+temp1 / +temp2;
                  temp1=temp1?temp1:"0";
                  temp2="";
                  opStore.shift();
                  break;
                  
                  case "*":temp1=+temp1 * +temp2;
                  temp2="";
                  opStore.shift();
                  break;
                
              }
              
          }
         
    
    
    
    }
         
         store=temp1.toString();
	 document.getElementById("display").value =temp1;
	 if(data==true)
	 {
	      calculateChecker=true;
	 }
	
	
	
}
