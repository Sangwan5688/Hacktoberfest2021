def momgean_shuffle(new_msg):
    new_msg=''.join(msg.split(' '))
    new_msg=list(new_msg)
    odd_msg=new_msg[1::2]
    even_msg=new_msg[0::2]
    enc_msg=odd_msg[::-1]
    enc_msg.extend(even_msg)
    return ''.join(enc_msg),len(odd_msg)


# In[12]:


msg=input('Enter the message')
enc_msg,length=momgean_shuffle(msg)
print(enc_msg)


# In[15]:


# decryption
dec_msg=[]
for i in range(0,length):
    dec_msg.append(list(enc_msg[length:])[i])
    dec_msg.append(list(enc_msg[0:length])[::-1][i])
if len(list(enc_msg[length:]))>length:
    dec_msg.append(list(enc_msg[length:])[-1])
print(''.join(dec_msg))


# In[ ]:
