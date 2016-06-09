class Track < ApplicationRecord
  acts_as_mappable :default_units => :kms,
                   :default_formula => :sphere,
                   :lat_column_name => :start_lat,
                   :lng_column_name => :start_lng

  has_attached_file :track_file
  do_not_validate_attachment_file_type  :track_file

  has_many :tracksegments, :dependent => :destroy
  has_many :points, :through => :tracksegments

  before_create :parse_file


  def parse_file
    tempfile = self.track_file.queued_for_write[:original]
    gpx_file = GPX::GPXFile.new(:gpx_data => tempfile)

    logger.info "File readed"
    logger.info gpx_file.distance

    self.distance = gpx_file.distance
    self.start_lat = gpx_file.tracks.first.segments.first.earliest_point.lat
    self.start_lng = gpx_file.tracks.first.segments.first.earliest_point.lon

    prev_elevation =gpx_file.tracks.first.segments.first.earliest_point.elevation
    tot_elevation=0.0
    tot_descent=0.0

    gpx_file.tracks.first.segments.each() do | segment |
      trksegment = Tracksegment.new
      segment.points.each() do |point|
        trkpoint = Point.new
        trkpoint.latitude=point.lat
        trkpoint.longitude=point.lon
        trkpoint.elevation=point.elevation

        if point.elevation > prev_elevation
          tot_elevation += point.elevation-prev_elevation
        end

        if point.elevation < prev_elevation
          tot_descent += prev_elevation-point.elevation
        end

        prev_elevation=point.elevation

        trksegment.points << trkpoint
      end
      self.tracksegments << trksegment
    end

    self.elevation = tot_elevation
    self.descent = tot_descent

  end
end
