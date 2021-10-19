/*
int front=-1, rear=-1;
int array[SIZE];
void enqueue(int item);
int dequeue();

Above variables are used for queue, SIZE, front and rear and all are global variables. Complete the below method. */

void reverseQueue(int q[])
{
	if(front<rear)
    {
      int x=dequeue();
      reverseQueue(q);
      enqueue(x);
    }
}
