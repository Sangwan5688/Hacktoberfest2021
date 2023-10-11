function [y] = GradienteConjugado(A,b,x,iter,error)
i = 0;
r = b - A*x;
d = r;
tol = norm(r);

while (i < iter && tol > error)

alpha = (d'*r)/(d'*A*d);
disp('alfa');
disp(alpha);
x = x + alpha*d;
fprintf(1,'%3d ',i+1)
fprintf(1,'%5.5f ',x')
fprintf(1,'\n')
r = b - A*x;
% disp(r);
beta = (d'*A*r)/(d'*A*d);
disp('beta');
disp(beta);
d = r-beta*d;
% disp(d);
tol = 100 * norm(r);
disp('error en %');
disp(tol);
i= i+1;
end
disp(x');
y = x;
end