import java.util.Arrays;
public class SpinningDonut {
    public static void main()throws InterruptedException {
        int k;
        double A = 0, B = 0, i, j;
        double[] z = new double[1760];
        char[] b = new char[1760];
        //System.out.print("\u001b[2J");
        //Thread.sleep(150);
        for (;;) {
            Arrays.fill(b, 0, 1760, ' ');
            Arrays.fill(z, 0, 1760, 0);
            for (j = 0; j < 6.28; j += 0.07) {
                for (i = 0; i < 6.28; i += 0.02) {
                    double ct = Math.cos(j);
                    double st = Math.sin(j);
                    double sp = Math.sin(i);
                    double cp = Math.cos(i);
                    double cA = Math.cos(A);
                    double sA = Math.sin(A);
                    double cB = Math.cos(B);
                    double sB = Math.sin(B);
                    double h = ct + 2;
                    double D = 1 / (sp * h * sA + st * cA + 5);
                    double t = sp * h * cA - st * sA;
                    int x = (int) (40 + 30 * D * (cp * h * cB - t * sB));
                    int y = (int) (12 + 15 * D * (cp * h * sB + t * cB));
                    int o = x + 80 * y;
                    int N = (int) (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
                    if (y < 22 && y > 0 && x > 0 && x < 80 && D > z[o]) {
                        z[o] = D;
                        b[o] = new char[]{'.', ',', '-', '~', ':', ';', '=', '!', '*', '#', '$', '@'}[Math.max(N, 0)];
                    }
                }
            }
            //System.out.print("\u001b[H");
            for (k = 0; k < 1761; k++) {
                System.out.print(k % 80 > 0 ? b[k] : 10);
            }
            Thread.sleep(100);
            A += 0.04;
            B += 0.02;
        }
    }
}