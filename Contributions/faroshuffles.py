def faro_shuffle(new_msg):
    count=[len(x)  for x in msg.split(' ')]
    new_msg=''.join(msg.split(' '))
    count.insert(0,0)
    new_msg=list(new_msg)
    half_count = len(new_msg)//2
    left_cut = new_msg[:half_count]
    right_cut = new_msg[half_count:]
    shuffle_msg = []
    for i in range(0, half_count):
        shuffle_msg.append(right_cut[i])
        shuffle_msg.append(left_cut[i])
    if len(right_cut)>len(left_cut):
        return shuffle_msg,right_cut[-1],count
    else:
        return shuffle_msg,None,count


# In[58]:


msg=input('Enter the message')
enc_msg,last_val,count=faro_shuffle (msg)
if last_val!=None:
    enc_msg.append(last_val)
    print(enc_msg)
else:
    print(enc_msg)


# In[65]:


#deccryption
if len(enc_msg)%2:
    dec_msg=[]
    new=[]
    msg=enc_msg[:-1]
    new=msg[1::2]
    new.extend(msg[0::2])
    new.append(enc_msg[-1])
    print(new)
        
else:
    new=msg[1::2]
    new.append(msg[0::2])
    print(new)


# In[66]:


new
