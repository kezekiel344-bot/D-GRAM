const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');
const os = require('os');
const path = require('path');
const fs = require('fs');

admin.initializeApp();
const storage = new Storage();

// Trigger: generate thumbnail when a reel is uploaded to "reels/{filename}"
exports.generateReelThumbnail = functions.storage.object().onFinalize(async (object) => {
  const bucketName = object.bucket;
  const filePath = object.name; // e.g. reels/uid/somefile.mp4
  if (!filePath.startsWith('reels/')) return null;

  // Only handle video uploads (simple check)
  const contentType = object.contentType || '';
  if (!contentType.startsWith('video/')) return null;

  const bucket = storage.bucket(bucketName);
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  await bucket.file(filePath).download({ destination: tempFilePath });

  // For MVP we'll just create a single-frame thumbnail using ffmpeg would be ideal.
  // If ffmpeg isn't available in the environment, you can use a paid service or Cloud Run.
  // Here we'll mock thumbnail creation by returning early.

  // TODO: Implement ffmpeg to capture frame and upload to thumbnails/
  console.log('Reel uploaded:', filePath);
  return null;
});

// Daily cleanup for expired stories (scheduled function)
exports.cleanupExpiredStories = functions.pubsub.schedule('every 60 minutes').onRun(async (context) => {
  const db = admin.firestore();
  const now = admin.firestore.Timestamp.now();
  const storiesRef = db.collectionGroup('stories');
  const expired = await storiesRef.where('expiresAt', '<=', now).get();
  const deletes = [];
  expired.forEach(doc => {
    deletes.push(doc.ref.delete());
  });
  await Promise.all(deletes);
  console.log(`Deleted ${deletes.length} expired stories`);
  return null;
});
