%METODO DE LA SECANTE
fprintf('Metodo de la SECANTE\n\n');

%Ingresamos la ecuacion a resolver
fx = input('Ingrese la funcion: ', 's');
f = inline(fx);

%Pedir los valores iniciales X0 X1
x0=input('Ingrese el valor de Xo: ');
x1=input('Ingrese el valor de X1: ');


tol=input('Ingrese el error admisible: ');
error = 100;
n=1;

fprintf(' i\t\t   Xo\t\t   X1\t\t   X2\t\t   Error\n');

while (error > tol)
  x2 = x1 - (x1-x0)*f(x1)/(f(x1)-f(x0));
  error = abs((x1-x0)/x1)*100;
  
  fprintf(' %1.0f\t   %10.10f\t   %10.10f\t   %10.10f\t   %10.10f\n', n,x0,x1,x2,error);
  
  x0 = x1;
  x1 = x2;
  
  n = n + 1;
  
end
