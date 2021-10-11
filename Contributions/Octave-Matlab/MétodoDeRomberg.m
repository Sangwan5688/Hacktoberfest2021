%Algoritmo de integracion - METODO DE ROMBERG 
 f = @(x) (e^x * sin(x)/(1+x^2));
 
 %Pedimos los valores para poder comenzar con el método
 a = input('Límite inferior, a:  ');
 b = input('Límite superior, b:  ');
 n = input('No. de subintervalos, j:  ');

 %Sacamos el valor de h para comenzar a utilizar el método de Trapecio
 h = b-a;
 r = zeros(2,n+1);
 %Obtenemos nuestra primera aproximación del método de Trapecio
 r(1,1) = (f(a)+f(b))/2*h;
 
 %Imprimimos la primera aproximación
 fprintf('\nResultados de la integracion Romberg:\n');
 fprintf('\n %11.10f\n\n', r(1,1));

 for i = 2:n
    sum = 0;
    for k = 1:2^(i-2)
       sum = sum+f(a+(k-0.5)*h);
    end
    r(2,1) = (r(1,1)+h*sum)/2;
   
    for j = 2:i
       l = 2^(2*(j-1));
       r(2,j) = r(2,j-1)+(r(2,j-1)-r(1,j-1))/(l-1);
    end

    for k = 1:i
       fprintf(' %11.10f',r(2,k));
    end
  
    fprintf('\n\n');
    h = h/2;
    for j = 1:i
       r(1,j) = r(2,j);
    end

 end 


 