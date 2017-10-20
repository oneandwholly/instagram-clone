SELECT photos_tags.photo_id
FROM tags
    INNER JOIN photos_tags
        ON photos_tags.tag_id = tags.id
    INNER JOIN photos
        ON photos.id = photos_tags.photo_id
WHERE tags.tag_name = 'NYC';


SELECT TableA.*, TableB.*, TableC.*, TableD.*
FROM TableA
    JOIN TableB
        ON TableB.aID = TableA.aID
    JOIN TableC
        ON TableC.cID = TableB.cID
    JOIN TableD
        ON TableD.dID = TableA.dID
WHERE DATE(TableC.date)=date(now()) 