import numpy as np
import cv2 as cv

def region_of_interest(img, vertices):
    mask = np.zeros_like(img)
    match_mask_color = 255
    cv.fillPoly(mask, vertices, match_mask_color)
    masked_image = cv.bitwise_and(img, mask)
    return masked_image


img = cv.imread('../image/left12.jpg')

cv.imshow('img', img)
print(img.shape)
height = img.shape[0]
width = img.shape[1]

#for any other image you have to set your region of interest
region_of_interest_vertices = [
    (160, height-40),
    (160, 50),
    (width-170, 50),
    (width-120, height-40)
]

gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
gray = np.float32(gray)

cropped_image = region_of_interest(gray,
                    np.array([region_of_interest_vertices], np.int32),)
dst = cv.cornerHarris(cropped_image, 2, 3, 0.04)

dst = cv.dilate(dst, None)

img[dst > 0.01 * dst.max()] = [0, 0, 255]

cv.imshow('dst', img)
cv.imwrite('cropped image.jpg',img)

if cv.waitKey(0) & 0xff == 27:
    cv.destroyAllWindows()
