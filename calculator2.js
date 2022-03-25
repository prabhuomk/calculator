var store=""; // to store all values.
var lastOperId="";  // to store the id of last pressed operator ,to clear the color when equal is pressed
var minusChecker=false;   //to differentiate - as operator and sign in display
var operatorChecker=false;  //to clear color of other operator when new operator is pressed
var dotCounter=0;
var openCount=0;
var closeCount=0;
var insideSquare="";
var swapCal=0;

 
// function to change the mode from normal to scientific calculator and vice versa

function calSwap()
{

    swapCal++;
    
    if(swapCal==1)
    {
       
         document.getElementById("data1").removeAttribute("hidden"); 
         document.getElementById("data2").removeAttribute("hidden");
         
    }
    
    else
    {
    
         document.getElementById("data1").setAttribute("hidden",true); 
         document.getElementById("data2").setAttribute("hidden",true); 
         swapCal=0;
    
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
        
	 elements = document.getElementsByClassName("opera");
        for (var i = 0; i < elements.length; i++)
        {
            elements[i].style.backgroundColor="white";
        }           
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
	
	elements = document.getElementsByClassName("opera");
        for (var i = 0; i < elements.length; i++)
        {
            elements[i].style.backgroundColor="white";
        }   
	
	       
}
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



function task(value)
{
    
          var signChecker=store.charAt(store.length-1); 
          var signChecker2=store.charAt(store.length-2); 
//condition for minus operator         
        
	if(value=="-" && signChecker!='.')
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
	    
	           dotCounter=0;
	           minusChecker=true;
	           operatorChecker=true;
	           operator(value);
	           lastOperId=value; 
	          
	    
	    }
	}
 //conditon of other operator and also prevent them to use at start
 
	else if(store!="-" && store.length>=1 && value!='(' && value!=')')
	{
	   
	        if(signChecker=='+'||signChecker=='*'||signChecker=='/'||(signChecker=='-'&& signChecker2!='+'&& signChecker2!='-'&& signChecker2!='*'&& signChecker2!='/'))//select last opertaor /+*
	        {      
	        
	               
	               minusChecker=true;
	               operatorChecker=true;
	               dotCounter=0;
	               var storeSlice=store.slice(0,-1);
	               store=storeSlice
	               operator(value);
	               lastOperId=value; 
	        }
	   
	       else if(signChecker!='-' && signChecker!='(' && signChecker!='.' )//to prevent operator after +-,*-,/-
	       {     
	       
	             dotCounter=0;
	             minusChecker=true;
	             operatorChecker=true;
	             operator(value);
	             lastOperId=value; 
	   
	      }   
	
         } 
         else if((value=='(' || value==')')&& ( signChecker!='.'))
         {
                   
                 
                 if((value=='(' && (signChecker=='-'&& signChecker2!='+'&& signChecker2!='-'&& signChecker2!='*'&& signChecker2!='/')) || (value=='(' && signChecker!='-'))
                 {
                     
                     openCount++;
                     if(closeCount<=openCount)
                     {
                        dotCounter=0;
                        console.log("hai")
                        minusChecker=true;
	                operatorChecker=true;
	                if(signChecker!='-'&&signChecker!='*'&& signChecker!='/'&& signChecker!='+'&&signChecker!="" && signChecker!="(") 
	                {
	                   store=store+"*";
	                 
	                }
	                operator(value);
	                lastOperId=value;
	              } 
                 
                 }
                 
                   
                   else if(value==')' && signChecker!='(' )
                   {
                   
                        closeCount++;
                        if(closeCount<=openCount)
                     {
                        dotCounter=0;
                        console.log("hai")
                        minusChecker=true;
	                operatorChecker=true;
	                operator(value);
	                lastOperId=value;
	              } 
                        
                   }
                    
                   
                   
          
         
         
         }
         
        
         
       

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
	    
	    if(store.charAt(store.length-1)==')')
	       {
	       
	           store=store+"*";
	       
	       }
	       store=store+value;
	      
	    
	    document.getElementById("checker").value =store;
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
	             
	       
	    
	             store=store+value;
	      
	    
	            document.getElementById("checker").value =store;
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
	  
	       store=store+value;
	     
	    
	   document.getElementById("checker").value =store;
	
}

function specialOperation(type)
{


   var sqStore="";
   var rev="";
   var sqData="";
   var flag=false;
   var bracketChecker=false;
   var countNum=0;
   var countCloseBracket=0;
   var countOpenBracket=0;
   
   
   for(var k=store.length-1;k>=0;k--)
   {
       
        if(store.charAt(store.length-1)==')')
        {
                    if(store.charAt(k)=='(')
                    {
                        
                          countOpenBracket++;
                    } 
                      
                    if(store.charAt(k)=='(' && (countCloseBracket==countOpenBracket))
                     {
                         flag=true;
                         store=store.slice(0,- (countNum+1));
                         sqStore=sqStore+'(';
                         bracketChecker=true;
                         break;
                    }
                    else
                    {    
                        if(store.charAt(k)==')')
                        {
                        
                          countCloseBracket++;
                        }
                         
                       countNum++;
                       sqStore=sqStore+store.charAt(k).toString();
             
        
                    }
              
        
        }
        else
        {
        
        
        
        
               if(store.charAt(k)=='+'|| store.charAt(k)=='/' || (store.charAt(k)=='-'&& k!=0) || store.charAt(k)=='*'||store.charAt(k)=='(')
               {     
                        flag=true;
                        store=store.slice(0,- countNum);
                        break;
              }
              else
              {     
                     countNum++;
                     sqStore=sqStore+store.charAt(k).toString();
             
        
              }
        
        }
   
   }
   
   
   
      rev=sqStore.split("").reverse().join("");
      
      if(bracketChecker==true)
      {
          
          calculate(rev);
          rev=insideSquare;
      
      }
      
      if(type==1)
      {
        sqData=+rev * +rev;
        
      }
      else if(type==2)
      {
         sqData=+rev * +rev * +rev;
      
      }
      else if(type==3)
      {
          sqData=Math.sqrt(rev);
      
      }
      else if(type==4)
      {
      
          sqData=Math.sin(rev);
      }
      else if(type==5)
      {
      
          sqData=Math.cos(rev);
      }
      else if(type==5)
      {
      
          sqData=Math.cos(rev);
      }
      else if(type==6)
      {
      
          sqData=Math.tan(rev);
      }
      else if(type==7)
      {
      
          sqData=Math.log(rev);
      }
      
      
      
      if(flag==true)
      {
           store=store+sqData;
           flag=false;
      }
      else
      {
          
           store=sqData.toString();
      }
     
      document.getElementById("checker").value =store;
      document.getElementById("display").value =sqData;
   
   
   
}


function calculate(data)
	{
		
		
		document.getElementById(lastOperId).style.backgroundColor="white";	
		var temArry=[];
		var tempDataStore="";
		 let arr=[];
		if(data!=0)
		{
		  arr=data.split('');
		   tempDataStore=store;
		   store=data;
		   
		}
		else
		{
		    arr=store.split('');
		}
		
		let dataStore="";
		let beforeProcess=[];
		let values = [];
		let ops = [];
		
		
		
		 for(let j=0;j<=store.length;j++)
                 {
                       
                       
                       if(j==store.length ||arr[j]=="+" || (arr[j]=="-"&& j!=0 && temArry.length!=0)|| (arr[j]=="-"&& arr[j-1]==")")||arr[j]=="/" ||arr[j]=="*" ||arr[j]=="(" ||arr[j]==")" )
                        {
                         
                             if(arr[j]=="(" ||arr[j]==")")
                             {
                             
                                     if(arr[j]==")" && j!=store.length)
                                     {
                                     
                                          while(temArry.length>0) 
                                           {
                         
                                             dataStore=dataStore+temArry.shift();
                                           }
                                     
                                            beforeProcess.push(dataStore);
                                            dataStore="";
                                       
                                             beforeProcess.push(arr[j]);
                                         
                                         
                                         
                                     }
                          
                                      else
                                      {
                                        
                                            beforeProcess.push(arr[j]);
                                          
                                         
                                      }   
                              
                                      
                             
                             
                
                             }
                             else
                             {      
                                    
                                     while(temArry.length>0)  
                                     {
                         
                                          dataStore=dataStore+temArry.shift();
                                     }
                                     
                                     beforeProcess.push(dataStore);
                                     dataStore="";
                                      
                                     if(j!=store.length) 
                                     {
                                       beforeProcess.push(arr[j]);
                                       
                                     }
                                                                   
                                      
                                  
                             }
                                     
                           
                     }
                
                    else //push operation
                     {
                        temArry.push(arr[j]);
                    
                            
                     }
                     
                 }
                 
               let temp=beforeProcess.filter(e=>e);
                 
               

		for (let i = 0; i < temp.length; i++)
		{
			
			if (temp[i] != '+' && temp[i] != '-' && temp[i] != '*' && temp[i] != '/' && temp[i]!='(' && temp[i]!=')')
			{
				  values.push(temp[i])
			}

			
			else if (temp[i] == '(')
			{
				ops.push(temp[i]);
			}

			
			else if (temp[i] == ')')
			{
				while (ops[ops.length - 1] != '(')
				{
				   values.push(applyOp(ops.pop(),values.pop(),values.pop()));
				}
				ops.pop();
			}

			
			else if (temp[i] == '+' || temp[i] == '-' || temp[i] == '*' ||temp[i] == '/')
			{
				
				
				while (ops.length > 0 && precedenceChecker(temp[i],ops[ops.length - 1]))
				{
				    values.push(applyOp(ops.pop(),values.pop(),values.pop()));
				}

				ops.push(temp[i]);
			}
		}

		
		while (ops.length > 0)
		{
			values.push(applyOp(ops.pop(),values.pop(),values.pop()));
		}

		  if(data!=0)
		  {
		      insideSquare="";
		      insideSquare=values.pop().toString();
		      store=tempDataStore
		  
		  }
		  else
		  {
		  store=values.pop().toString();
		   
	          document.getElementById("display").value =store;
	          }
	}

	
	function precedenceChecker(op1, op2)
	{
		if (op2 == '(' || op2 == ')')
		{
			return false;
		}
		if ((op1 == '*' || op1 == '/') && (op2 == '+' || op2 == '-'))
		{
			return false;
		}
		
		else
		{
			return true;
		}
	}

	
	function applyOp(op, b, a)
	{
		switch (op)
		{
		case '+':
			return +a + +b;
		case '-':
			return +a - +b;
		case '*':
			return +a * +b;
		case '/':
			return +a / +b;
		}
		return 0;
	}
	

