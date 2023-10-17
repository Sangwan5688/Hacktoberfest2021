from PIL import Image
from ultralytics import YOLO
import os
# Load a pretrained YOLOv8n model
model = YOLO('yolov8n.pt')
#THIS IS FOR IMAAAAAAGEEEEEEEEEE DETECTION !!
img_count = 0
image_paths = []
image_directory = "F:\\GFG\\Images\\" #enter the path for image folder here !
for filename in os.listdir(image_directory):
    if filename.endswith(".jpg") or filename.endswith(".JPG") or filename.endswith(".jpeg") or filename.endswith(".png"):
        image_paths.append(os.path.join(image_directory, filename))
        img_count += 1
# Now, image_paths contains the paths of the images
print(f'Total number of images in the folder {image_directory} : ',img_count)
# # For example, if you have a directory with multiple image files:
# image path example : 'F:\\GFG\\Images\\img3.jpg'
count = 0
for i in image_paths:
    results = model(i)  # results list
    count += 1
    # Show the results
    for r in results:
        im_array = r.plot()  # plot a BGR numpy array of predictions
        im = Image.fromarray(im_array[..., ::-1])  # RGB PIL image
        im.show()  # show image
        im.save(f'F:\\GFG\\static\\detection_result\\{count}.jpg')  # save image