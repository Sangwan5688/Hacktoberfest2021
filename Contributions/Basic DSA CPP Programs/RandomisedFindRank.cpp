#include <iostream>
using namespace std;
long long int
FindRank (int A[], long long int l, long long int r, long long int rank);


long long int
Partition (int A[], long long int l, long long int r)
{

  long long int i, j, pivot, t;
  pivot = A[l];
  i = l + 1;
  j = r;
  while (i <= j)
    {
      while (i <= j && A[i] <= pivot)
	i++;
      while (i <= j && A[j] > pivot)
	j--;
      if (i < j)
	{
	  t = A[i];
	  A[i] = A[j];
	  A[j] = t;
	  i++;
	  j--;
	}
    }
  i--;
  A[l] = A[i];
  A[i] = pivot;
  return i;
}


void
RQSort (int A[], long long int l, long long int r)
{
  if (l < r)
    {
      long long int k, p, t;
      p = rand () % (r - l + 1) + l;
      t = A[l];
      A[l] = A[p];
      A[p] = t;
      k = Partition (A, l, r);

      RQSort (A, l, k - 1);
      RQSort (A, k + 1, r);

    }
}


long long int
RFindRank (int A[], long long int l, long long int r, long long int rank)
{
  if (l < r)
    {
      long long int k, p, t;
      p = rand () % (r - l + 1) + l;
      t = A[l];
      A[l] = A[p];
      A[p] = t;
      k = Partition (A, l, r);
      if (rank == r - k + 1)
	return k;
      else if (rank < r - k + 1)
	return RFindRank (A, k + 1, r, rank);
      else
	return RFindRank (A, l, k - 1, rank - r + k - 1);

    }
  else if (rank == 1)
    return r;

  else
    {
      cout << "kjfdskjfdkj";
      return 0;
    }

}

void
BubbleSort1 (int A[], long long int l, long long int r)
{
  long long int i, j;
  long long int t;
  for (i = 0; i < r - l; ++i)
    for (j = l; j < r - i; ++j)
      if (A[j] > A[j + 1])
	{
	  t = A[j];
	  A[j] = A[j + 1];
	  A[j + 1] = t;
	}
}

long long int
Goodpivot (int A[], long long int l, long long int r)
{
  long long int i = l, j = l, t, n = (r - l + 1) / 5;

  while (i + 4 <= r)
    {
      BubbleSort1 (A, i, i + 4);

      t = A[j];
      A[j] = A[i + 2];
      A[i + 2] = t;
      ++j;
      i += 5;
    }
  return FindRank (A, l, l + n - 1, n / 2);
}

void
printarray (int A[], long long int l, long long int r)
{

  while (l <= r)
    cout << A[l++] << ",";
  cout << "\n";
}

long long int
FindRank (int A[], long long int l, long long int r, long long int rank)
{
  if (l + 3 < r)
    {
      long long int k, p, t;
      p = Goodpivot (A, l, r);
      t = A[l];
      A[l] = A[p];
      A[p] = t;
      k = Partition (A, l, r);
      if (rank == r - k + 1)
	return k;
      else if (rank < r - k + 1)
	return FindRank (A, k + 1, r, rank);
      else
	return FindRank (A, l, k - 1, rank - r + k - 1);

    }
  else if (l < r)
    {

      BubbleSort1 (A, l, r);

      return r - rank + 1;


    }
  else
    return r;
}

void
Greatest ()
{
  long long int i, j, k, m, n, num = 100000, p, t;
  int A[num];
  cin >> n;
  cin >> m;
  if (n < num)
    num = n;
  for (i = 0; i < num; ++i)
    A[i] = rand () % num;
  n = n - i;
  while (n > 0)
    {
      k = num;
      while (k > num - m)
	{
	  p = rand () % k;
	  t = A[0];
	  A[0] = A[p];
	  A[p] = t;
	  k = Partition (A, 0, k);
	}
      j = A[k];
      while (n > 0 && k > 0)
	{
	  i = rand () % num;
	  n--;
	  if (i > j)
	    A[--k] = i;
	}
    }


  RFindRank (A, 0, num - 1, m);
  printarray (A, num - m, num - 1);
}


int
main ()
{
  long long int n = 100000, i, j, k, rank;
  int A[1000000];
  cin >> n;
  for (i = 0; i < n; ++i)
    {
      A[i] = rand () % 25000 + 10;
      //cout<<A[i]<<", ";
    }
  Greatest ();

/* cin >> rank;
  rank=n*.99;
     for (i = 0; i < 500; ++i){
  
     rank=rank*.99;
     if(A[FindRank (A, 0, n - 1, rank)]!=A[RFindRank (A, 0, n - 1, rank)]) cout<<"good";
     } 
  */

  return 0;
}
