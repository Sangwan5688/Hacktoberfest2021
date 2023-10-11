function [y] = GaussSeidel(A,b,x)
format %1.8

C = A;
d = b;
y = x;

ren = length(A);


for n = 1:ren
C(n,:) = A(n,:)/A(n,n);
C(n,n) = 0;
d(n) = b(n)/A(n,n);

end

for n = 1:ren
y(n) = d(n) - C(n,:) * y;
end

disp(norm(b - A*y));