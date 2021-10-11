function [y] = Relajaciones_1(A,b,x)
  
  C = A;
  d = b;
  
  ren = length(A);
  
  for n = 1:ren
    C(n,:) = A(n,:)/-A(n,n);
    d(n) = b(n)/A(n,n);
  end
  
  y = d + C*x;
  
  disp(y);
