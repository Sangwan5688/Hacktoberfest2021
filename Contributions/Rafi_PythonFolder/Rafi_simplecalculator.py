print('Kalkulator sederhana menggunakan python ')
import getpass
getpass.getpass("Press Enter to Continue.....")
while True:
    try:
        firstnum=float(input('masukan angka pertama -> '))
        break
    except ValueError:
        print('Mohon masukan angka!')
        continue
while True:
    try:
        secnum=float(input('masukan angka kedua -> '))
        break
    except ValueError:
        print('Mohon masukan angka!')
        continue
plus=firstnum+secnum
minus=firstnum-secnum
multipl=firstnum*secnum
devide=firstnum/secnum
residu=firstnum%secnum
power=firstnum**secnum
print('Hasil dari ', firstnum, '+', secnum, 'adalah ', plus)
print('Hasil dari ', firstnum, '-', secnum, 'adalah ', minus)
print('Hasil dari ', firstnum, 'x', secnum, 'adalah ', multipl)
print('Hasil dari ', firstnum, '÷', secnum, 'adalah ', devide)
print('Hasil dari ', firstnum, '%', secnum, 'adalah ', residu)
print('Hasil dari ', firstnum, '^', secnum, 'adalah ', power)