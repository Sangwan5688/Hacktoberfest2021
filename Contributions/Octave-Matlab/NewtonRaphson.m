function NewtonRaphson
    printf('METODO NEWTON-RAPHSON\n');
    f=input('ingrese la funcion f(x): ','s');
    f=inline(f);
    fp=input('ingrese la derivada de la funcion: ','s');
    fp=inline(fp);
    xi=input('escriba el punto de inicio: ');  
    error=input('Ingrese el error maximo admisible: ');
    n=input('Ingrese el numero maximo de iteraciones permitidas: ');
    fx=f(xi);
    fpx=fp(xi);   
    i=1;
    fprintf('\n\titer\t       x\t      f(x)\t     fp(x)\t    Error \n')
    while  i<=n && fx~=0 && fpx~=0
        x=xi-(fx/fpx);
        fx=f(x);
        fpx=fp(x);
        e=abs((x-xi)/x)*100;
        fprintf('\t%1.0f\t %10.10f\t %10.10f\t %10.10f\t %10.10f\t\n',i,x,f(x),fp(x),e)
        xi=x;
        if (e <= error)
            i = n + 1;
        end
        i=i+1;
    end
   
if fx==0
    fprintf('\n La raíz es: %1.10f \n\n',xi)
  else if e<error
        fprintf('\n %1.10f es una aproximacion a la raiz con un error maximo de %1.10f \n',xi,e)
      else if fpx==0
           fprintf(' %1.10 es una posible raiz multiple.',xi)  
          else
           fprintf('\n El metodo fallo en %0.0f iteraciones \n\n',n) 
          end
      end
end
end

